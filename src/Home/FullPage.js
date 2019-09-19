import React, { useState } from 'react';
import { SectionsContainer, Section, ScrollToTopOnMount } from 'react-fullpage';
import Questions from './Questions';
import swal from 'sweetalert';
import './static/style';
// => in the render() method of your app

const anchorFunc = (anchor_data) => { // return array of anchor tags
  return anchor_data.map((item) => (
    item.id
  ))
}

export default function FullPage({ data, url }) {

  let options = {
    sectionClassName: 'section',
    anchors: anchorFunc(data),
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    sectionPaddingTop: '50px',
    sectionPaddingBottom: '50px',
    arrowNavigation: false
  };

  const [obj, setObj] = useState({});


  const inputDataHandler = (name, value) => {
    console.log(name, value)
    console.log(obj)
    setObj({
      ...obj,
      [name]: value
    });
  }

  const submitBtnHandler = () => {
    console.log(obj);
    //API call here
    fetch(url, {
      method: 'post',
      body: JSON.stringify(obj)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      swal({ //show success message on completion
        title: "",
        text: "Thanks for completing the survey !!",
        icon: "success",
        dangerMode: false,
      })
    });
  }

  return (
    <div >
      <ScrollToTopOnMount />
      <SectionsContainer {...options}>
        {
          data.map((item, i) => {
            return (
              <Section key={i} >
                <div>
                  <header className="App-header">
                    <Questions
                      item={item}
                      index={i}
                      isSubmit={i == (data.length - 1) ? true : false}
                      inputDataHandler={inputDataHandler}
                      submitBtnHandler={submitBtnHandler}
                    />
                  </header>
                </div>
              </Section>
            )
          })
        }
      </SectionsContainer>
    </div>
  );
}

