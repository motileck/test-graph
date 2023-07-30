import React, {useEffect, useRef, useState} from 'react';
import './Field.css'
const Field = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        // draw chart here using ctx

        const handlePan = (event) => {
            if (event.buttons === 1) {
                setCanvasOffset((prev) => ({
                    x: prev.x + event.movementX,
                    y: prev.y + event.movementY,
                }));
            }
        };

        const handleWheel = (event) => {
            event.preventDefault();
            const newScale = scale - event.deltaY * 0.001;
            setScale(Math.max(0.1, newScale));
        };

        canvas?.addEventListener('mousedown', () => {
            canvas.addEventListener('mousemove', handlePan);
        });

        canvas?.addEventListener('mouseup', () => {
            canvas.removeEventListener('mousemove', handlePan);
        });

        canvas?.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            canvas?.removeEventListener('mousedown', () => {
                canvas.removeEventListener('mousemove', handlePan);
            });

            canvas?.removeEventListener('mouseup', () => {
                canvas.removeEventListener('mousemove', handlePan);
            });

            canvas?.removeEventListener('wheel', handleWheel);
        };
    }, [scale]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                border: '1px solid #ccc',
                backgroundColor: "black",
                cursor: 'grab',
                transform: `scale(${scale}) translate(${canvasOffset.x}px, ${canvasOffset.y}px)`,
            }}
        />
    );
};

export default Field;