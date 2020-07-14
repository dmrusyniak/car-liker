import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import "./index.scss"
import downArrow from "../images/drop-down-arrow.png"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const ogMakes = ["ALFA ROMEO", "AUDI", "BMW", "PORSCHE"]
const models = {
  "ALFA ROMEO": { models: ["GUILIA", "BRERA"] },
  AUDI: { models: ["S4", "RS4"] },
  BMW: { models: ["M3", "M5"] },
  PORSCHE: { models: ["911"] },
}

function IndexPage(props) {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * close if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setMakeMenu(false)
          setMakes(ogMakes)
          console.log("uh oh , btw make is: ", make)
          if (testRef.current.value) {
            testRef.current.value = ""
          }
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
  const testRef = useRef()
  const makeRef = useRef()
  useOutsideAlerter(wrapperRef)

  const [makes, setMakes] = useState(ogMakes)
  const [make, setMake] = useState("MAKE")
  const [makeMenu, setMakeMenu] = useState(false)
  const [clearEvent, setClearEvent] = useState(false)

  function openMake() {
    setMake("")
    setMakes(ogMakes)
    testRef.current.value = ""
    setMakeMenu(true)
  }

  function makeAlfa(el) {
    setMake(el)
    console.log("ref test: ", testRef.current)
    testRef.current.value = el
    setMakeMenu(false)
  }

  function handleInputChange(event) {
    event.preventDefault()

    setMakes(ogMakes)

    console.log("inputchange")
    console.log("event.target.value: ", event.target.value)
    console.log(
      "filter result: ",
      makes.filter(word => word[0] === event.target.value[0])
    )
    setMakes(makes.filter(word => word[0] === event.target.value[0]))
    console.log("makes: ", makes)
    if (event.target.value === "") {
      setMakes(ogMakes)
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div className="filter-container">
        <div className="toggle-container">
          <div className="search-tab">SEARCH</div>
          <div className="share-tab">SHARE</div>
        </div>
        <div>
          <div
            ref={wrapperRef}
            className={make === "MAKE" ? "search-make" : "search-make-ready"}
          >
            <div onClick={openMake} className="make-flex">
              <form>
                <input
                  type="text"
                  placeholder={make}
                  onChange={handleInputChange}
                  ref={testRef}
                  className="input"
                ></input>
              </form>

              <div className="drop-down-arrow">
                <img src={downArrow}></img>
              </div>
            </div>
            <div className="drop-down-bg">
              {makeMenu ? (
                makes.map((el, index) => (
                  <div>
                    <div onClick={() => makeAlfa(el)} className="make-item">
                      {el}
                    </div>
                  </div>
                ))
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
        <div
          className={
            make === "MAKE" || make === ""
              ? "search-submit"
              : "search-submit-ready"
          }
        >
          SUBMIT
        </div>
      </div>
      <div></div>
      {/* <div className="featured-divider"></div> */}
    </Layout>
  )
}

export default IndexPage
