import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Powered By Donut Company',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
      Donut is the greatest start up in <code>2024</code>, we are encourage you to use our products.  
      </>
    ),
  },
  {
    title: 'Parses Business Process Description',
    Svg: require('@site/static/img/document.svg').default,
    description: (
      <>
        By giving the flow miner the process description, it will give you the bpmn <code>xml</code> automaticlly.
      </>
    ),
  },
  {
    title: 'Multi Agent Collaboration',
    Svg: require('@site/static/img/group.svg').default,
    description: (
      <>
      This system uses the state of the art approaches to implement <code>bpmn</code> generation,
      by using large language models and multi agent collaboration. 
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
