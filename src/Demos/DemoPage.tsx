import './DemoPage.scss';

import React, { useEffect, useState } from 'react';
import Highlight from 'react-highlight';

import Demo from './Demo';

const getDemoPage = (demo: Demo) => {
  return () => {
    const [text, changeText]: [string, any] = useState('');
    useEffect(() => {
      const name = demo.fileName;
      fetch(`demos/${name}/${name}.tsx`)
        .then((res) => res.text())
        .then((fileText) => changeText(fileText));
    }, []);
    return (
      <div>
        <div className='simulator-content'>
          <h1>{demo.title}</h1>
          <demo.component />
        </div>
        <div className='code'>
          <div className='editor-links'>
            <span>Edit demo in stackblitz: </span>
            <a className='editor-link editor-link-ts' href={demo.tsLink} rel='noopener noreferrer' target='_blank'>
              TS Example
            </a>
            <a className='editor-link editor-link-js' href={demo.jsLink} rel='noopener noreferrer' target='_blank'>
              JS Example
            </a>
          </div>
          <Highlight className='language-typescript'>
            {text}
          </Highlight>
        </div>
      </div>
    );
  };
};

export default getDemoPage;
