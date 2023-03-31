import React from 'react';

const logo = './src/assets/logo-no-background.svg';

export default function Header() {
  return (
    <div>
      <header className='header'>
        <img src={logo} alt='' className='logo' />
        <nav className='nav'>
          <ul className='nav-items'>
            <li>
              <a
                href='https://github.com/danielrees8743/boxer-connect'
                target='_blank'>
                Github
              </a>
            </li>
            <li>
              <a href='#'>Issues</a>
            </li>
            <li>
              <a href='#'>About</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
