import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import "./index.css"
import downArrow from "../images/drop-down-arrow.png"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const makes = ["AUDI", "BMW", "PORSCHE"]

function IndexPage(props) {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * close if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setMakeMenu(false)
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [ref])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  const [makeMenu, setMakeMenu] = useState(false)

  function openMake() {
    setMakeMenu(true)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div className="filter-container">
        <div className="toggle-container">
          <div className="search-tab">SEARCH</div>
          <div className="share-tab">SHARE</div>
        </div>
        <div ref={wrapperRef}>
          <div className="search-make" onClick={openMake}>
            <div className="make-flex">
              <div>MAKE</div>
              <div className="drop-down-arrow">
                <img src={downArrow}></img>
              </div>
            </div>
            <div className="drop-down-bg">
              {makeMenu ? (
                <div>
                  <div>ALFA ROMEO</div>
                  <div>AUDI</div>
                  <div>BMW</div>
                  <div>PORSCHE</div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="search-model">
          <div className="model-flex">
            <div>MODEL</div>
            <div className="drop-down-arrow">
              <img src={downArrow}></img>
            </div>
          </div>
        </div>
        <div className="search-submit">SUBMIT</div>
      </div>
      <div></div>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}></div>
    </Layout>
  )
}

export default IndexPage
