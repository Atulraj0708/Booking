export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : process.env.REACT_APP_SER_URL+'/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }