import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("👀 Calling OpenAI...")
    let data;
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
      data = await response.json();
    } catch (error) {
      console.error(error);
      setIsGenerating(false);
      return;
    }
    const { output } = data;
    console.log("🥳 OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event: any) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Unlock Creative Domain Ideas for Your Business</h1>
          </div>
          <div className="header-subtitle">
            <h2 style={{ textAlign: 'center' }}>Explore Alternative Domains for Your Website: Find the Perfect Domain Name for Your Business!</h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
          <textarea
            placeholder="Enter the domain name you have in mind."
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Suggest Alternatives</p>}
              </div>
            </a>
          </div>
          {/* New code I added here */}
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Suggested Alternatives</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://github.com/MaximilianDietel03/alternative-domain-suggestions"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>Check out the code!</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
