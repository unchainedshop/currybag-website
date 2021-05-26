import { useEffect, useState } from 'react';

import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';

const AboutUs = () => {
  const [currentUrl, setcurrentUrl] = useState('');
  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags title="About us" url={currentUrl} />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>About</h1>
            <p>
              Dynoptic ist das Schweizer Qualitätslabel für Brillen und
              Kontaktlinsen. Unsere über 100 Dynoptic Partner freuen sich auf
              Ihren Besuch: online oder vor Ort.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;