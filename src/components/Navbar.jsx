import React from 'react';
import StaggeredMenu from './StaggeredMenu/StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '/#home' },
  { label: 'About', ariaLabel: 'Go to about section', link: '/#about' },
  { label: 'Service', ariaLabel: 'Go to service section', link: '/#service' },
  { label: 'Project', ariaLabel: 'Go to project section', link: '/#project' },
  { label: "Let's Connect", ariaLabel: "Go to let's connect section", link: '/#lets-connect' }
];

const socialItems = [
  { label: 'Email', link: 'mailto:heenarather408@gmail.com' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/heena-rather-b8927117b/' },
  { label: 'GitHub', link: 'https://github.com/heenacgsuae5-cmd' }
];

const Navbar = () => {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#fff"
      openMenuButtonColor="#fff"
      changeMenuColorOnOpen={true}
      colors={['#0a0a0a', '#1a1a1a']}
      accentColor="#ccff00"
      isFixed={true}
      onMenuOpen={() => console.log('Menu opened')}
      onMenuClose={() => console.log('Menu closed')}
    />
  );
};

export default Navbar;
