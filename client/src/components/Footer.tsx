import { Box, Link } from '@chakra-ui/react';

interface FooterProps {
  style?: React.CSSProperties;
}

const Footer: React.FC<FooterProps> = ({ style }) => {
  return (
    <>
      <Box style={style} textAlign="center" color="#4d4d4d">
        Made by{' '}
        <Link target="_blank" href="https://www.linkedin.com/in/al-chang-/">
          Alexander Chang
        </Link>
      </Box>
    </>
  );
};

export default Footer;
