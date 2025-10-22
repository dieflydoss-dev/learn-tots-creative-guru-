import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { Prompts } from './UnlockScreen';

interface CreationScreenProps {
  prompts: Prompts;
}

const CreationScreen: React.FC<CreationScreenProps> = ({ prompts }) => {
  const { characters, actions, styles } = prompts;

  const [character, setCharacter] = useState(characters[0]);
  const [action, setAction] = useState(actions[0]);
  const [style, setStyle] = useState(styles[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    setGeneratedImage(null);
    
    const prompt = `${character} ${action} ${style}.`;

    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [character, action, style]);

  const handleReset = () => {
    setGeneratedImage(null);
    setApiError(null);
  };
  
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `learntots-art-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const SelectInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[]; }> = ({ label, value, onChange, options }) => (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-semibold text-slate-700">{label}</label>
      <select value={value} onChange={onChange} className="w-full p-3 border-2 border-slate-300 bg-white rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition">
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  if (isLoading || generatedImage || apiError) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl mx-auto text-center">
        {isLoading && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-sky-600">Creating your masterpiece...</h2>
            <LoadingSpinner />
            <p className="text-slate-500 mt-4">This can take a moment. The AI is thinking hard!</p>
          </>
        )}
        {apiError && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-red-600">Oh no! Something went wrong.</h2>
            <p className="text-slate-600 mb-6">{apiError}</p>
            <button onClick={handleReset} className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-amber-600 transition">Try Again</button>
          </>
        )}
        {generatedImage && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-green-600">Look what you created!</h2>
            <img src={generatedImage} alt="AI generated art" className="rounded-lg shadow-md mx-auto mb-6 max-w-full h-auto" style={{maxWidth: '512px'}}/>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleDownload} className="bg-sky-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-sky-600 transition">Download</button>
              <button onClick={handleReset} className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-amber-600 transition">Create Another!</button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2">AI Art Creator</h2>
      <p className="text-slate-600 text-center mb-8">Let's make some art! Mix and match the options below.</p>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <SelectInput label="1. Choose a Character" value={character} onChange={(e) => setCharacter(e.target.value)} options={characters} />
        <SelectInput label="2. What are they doing?" value={action} onChange={(e) => setAction(e.target.value)} options={actions} />
        <SelectInput label="3. Pick a Style" value={style} onChange={(e) => setStyle(e.target.value)} options={styles} />
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full bg-fuchsia-500 text-white font-bold text-2xl py-4 rounded-lg shadow-lg hover:bg-fuchsia-600 disabled:bg-slate-400 transition-transform transform hover:scale-105"
      >
        ✨ Generate Art! ✨
      </button>
    </div>
  );
};

export default CreationScreen;