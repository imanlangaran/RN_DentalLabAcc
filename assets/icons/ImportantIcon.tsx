import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface ImportantIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ImportantIcon = ({
  width = 32,
  height = 32,
  color = '#fff'
}: ImportantIconProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
    >
      <Path
        fill={color}
        d="M10 8a6 6 0 0 1 12 0c0 3.523-1.986 8.536-3.16 11.19C18.346 20.31 17.227 21 16 21s-2.345-.69-2.84-1.81C11.985 16.536 10 11.522 10 8m6 22a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7"
      />
    </Svg>
  );
};

export default ImportantIcon;