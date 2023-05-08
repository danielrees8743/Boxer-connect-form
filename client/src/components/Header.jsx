import React from 'react';

const logo = './src/assets/logo-no-background.svg';

export default function Header() {
  const hover = 'hover:text-blue-200';

  return (
    <div>
      <header className='flex flex-row items-center justify-between'>
        <img src={logo} alt='Boxer-connect image' className='h-20 m-5' />
        <nav className='mr-5 '>
          {/* Change the color */}
          <ul className='nav-items text-2xl font-bold text-blue-400 flex flex-row gap-4'>
            <li className={hover}>
              <a
                href='https://github.com/danielrees8743/boxer-connect'
                target='_blank'
              >
                Github
              </a>
            </li>
            <li className={hover}>
              <a href='#'>Issues</a>
            </li>
            <li className={hover}>
              <a href='#'>About</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
