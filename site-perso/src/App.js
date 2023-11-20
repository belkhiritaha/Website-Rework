import './App.css';
import { Button, Collapse, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Fade } from 'react-bootstrap';
import useConsole from './console';
import Menu from './menu';
import { useState } from 'react';

function App() {
    const [open, setOpen] = useState(true);
    useConsole();

    if (!open) {
      return (
          <>

              <div style={{ width: '100%', marginTop: 'auto', fontSize: "300%", paddingBottom: "50%" }} className='console-container'><span id='text'></span><div className='console-underscore' id='console'>&#95;</div></div>

              <div className="whoami">
                  <Col>
                      <Col>
                          <h2>$ whoami </h2>
                          <p className="description">Hi, I'm <b>Taha</b> and I'm a <b>Networks and Cybersecurity Student</b> at <b>Clermont Auvergne INP ISIMA</b>. I'm currently looking for a <b>4 to 6 months internship</b>.</p>
                      </Col>

                      <Col>
                          <h2>$ more</h2>
                          <p className="description">21 years old, <b>Moroccan</b>, interested in <b>cybersecurity</b>, <b>networks</b> and <b>CTFs</b>. You'll find all of my <b>projects</b> and <b>writeups</b> on this website.</p>
                      </Col>

                      <Col>
                          <h2>$ more | grep hobbies</h2>
                          <p className="description">I like <b>hacking</b>, <b>coding</b>, <b>gaming</b>, <b>playing chess</b> and <b>listening to music</b><span className='blink'>_</span></p>
                      </Col>
                  </Col>
              </div>

              <Button style={{ width: "20vw", marginLeft: "40vw", marginTop: "10vh" }} variant="success" size="lg" block onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
                  <span style={{ color: 'white' }}>Learn more</span>
              </Button>

          </>

      );
    }

    return (
        <Menu />
    );

}

export default App;
