import classes from "./styles.module.css";
import Image from 'next/image';

const Hero = () => {
  return (
    <section>
      <div className={classes.hero}>
        <div className={classes.image}>
          <Image
            src="/images/sample.jpg"
            alt="Greg Image"
            width={300}
            height={300}
          />
        </div>
        <h1>Hi, I'm Greg</h1>
        <p>I like to blog</p>
      </div>
    </section>
  );
};

export default Hero;
