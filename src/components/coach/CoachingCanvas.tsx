import React, { useState, useRef } from 'react';
import { Save, Trash2, Type, Image, Link } from 'lucide-react';

interface CanvasElement {
    id: string;
    type: 'text' | 'image' | 'link';
    content: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
}

const CoachingCanvas: React.FC = () => {
    const [elements, setElements] = useState<CanvasElement[]>([]);
    const [selectedElement, setSelectedElement] = useState<string | null>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    const addElement = (type: 'text' | 'image' | 'link') => {
        const newElement: CanvasElement = {
            id: Date.now().toString(),
            type,
            content: type === 'text' ? 'New Text' : type === 'image' ? 'Image URL' : 'Link URL',
            position: { x: 100, y: 100 },
            size: { width: 200, height: type === 'text' ? 100 : 150 },
        };
        setElements([...elements, newElement]);
    };

    const updateElement = (id: string, updates: Partial<CanvasElement>) => {
        setElements(elements.map((el) => (el.id === id ? { ...el, ...updates } : el)));
    };

    const deleteElement = (id: string) => {
        setElements(elements.filter((el) => el.id !== id));
        if (selectedElement === id) {
            setSelectedElement(null);
        }
    };

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            updateElement(id, { position: { x, y } });
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div className='flex h-screen bg-gray-100'>
            {/* Toolbar */}
            <div className='w-16 bg-white shadow-lg p-4 flex flex-col items-center space-y-4'>
                <button onClick={() => addElement('text')} className='p-2 hover:bg-gray-100 rounded-lg transition-colors' title='Add Text'>
                    <Type className='h-6 w-6 text-gray-600' />
                </button>
                <button onClick={() => addElement('image')} className='p-2 hover:bg-gray-100 rounded-lg transition-colors' title='Add Image'>
                    <Image className='h-6 w-6 text-gray-600' />
                </button>
                <button onClick={() => addElement('link')} className='p-2 hover:bg-gray-100 rounded-lg transition-colors' title='Add Link'>
                    <Link className='h-6 w-6 text-gray-600' />
                </button>
            </div>

            {/* Canvas */}
            <div className='flex-1 p-8'>
                <div className='flex justify-between mb-4'>
                    <h2 className='text-2xl font-bold text-gray-800'>Coaching Framework Canvas</h2>
                    <button
                        className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2'
                        onClick={() => console.log('Save canvas:', elements)}
                    >
                        <Save className='h-5 w-5' />
                        <span>Save Framework</span>
                    </button>
                </div>

                <div
                    ref={canvasRef}
                    className='bg-white rounded-lg shadow-lg p-4 h-[calc(100vh-12rem)] relative'
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {elements.map((element) => (
                        <div
                            key={element.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, element.id)}
                            onClick={() => setSelectedElement(element.id)}
                            className={`absolute cursor-move ${selectedElement === element.id ? 'ring-2 ring-blue-500' : ''}`}
                            style={{
                                left: element.position.x,
                                top: element.position.y,
                                width: element.size.width,
                                height: element.size.height,
                            }}
                        >
                            {element.type === 'text' && (
                                <textarea
                                    value={element.content}
                                    onChange={(e) => updateElement(element.id, { content: e.target.value })}
                                    className='w-full h-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            )}
                            {element.type === 'image' && (
                                <div className='w-full h-full border rounded-md p-2'>
                                    <input
                                        type='text'
                                        value={element.content}
                                        onChange={(e) => updateElement(element.id, { content: e.target.value })}
                                        className='w-full mb-2 p-1 border rounded'
                                        placeholder='Image URL'
                                    />
                                    {element.content && <img src={element.content} alt='Canvas element' className='w-full h-full object-contain' />}
                                </div>
                            )}
                            {element.type === 'link' && (
                                <div className='w-full h-full border rounded-md p-2'>
                                    <input
                                        type='text'
                                        value={element.content}
                                        onChange={(e) => updateElement(element.id, { content: e.target.value })}
                                        className='w-full p-1 border rounded'
                                        placeholder='Link URL'
                                    />
                                </div>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteElement(element.id);
                                }}
                                className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600'
                            >
                                <Trash2 className='h-4 w-4' />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoachingCanvas;
