import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import "./index.scss"
import downArrow from "../images/drop-down-arrow.png"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const ogMakes = ["ALFA ROMEO", "AUDI", "BMW", "PORSCHE"]
const ogModels = {
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

          // if (testRef.current.value) {
          //   testRef.current.value = ""
          // }
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

  const [models, setModels] = useState(ogMakes)
  const [model, setModel] = useState("MODEL")
  const [modelMenu, setModelMenu] = useState(false)

  function openMake() {
    // setMake("")
    setMakes(ogMakes)
    // testRef.current.value = ""
    if (testRef.current.value) {
      setMakes(makes.filter(word => word[0] === testRef.current.value[0]))
    }
    setMakeMenu(true)
  }

  function search(el, array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      if (el === array[i].substring(0, el.length)) {
        result.push(array[i])
      }
    }
    return result
  }

  function makeAlfa(el) {
    setMake(el)
    testRef.current.value = el
    setMakeMenu(false)
    setMakes(ogMakes)
  }

  function handleInputChange(event) {
    event.preventDefault()
    event.target.value = event.target.value.toUpperCase()
    setMakes(ogMakes)
    setMakeMenu(true)
    setMake(event.target.value)
    console.log("inputchange")
    console.log("event.target.value: ", event.target.value)
    console.log(
      "What I'm about to set makes to: ",
      search(event.target.value, ogMakes)
    )
    setMakes(search(event.target.value, ogMakes))
    console.log("ok I set it officially: ", makes)
    if (event.target.value === "" || event.target.value === " ") {
      setMakes(ogMakes)
    }
    if (!event.target.value.replace(/\s/g, "").length) {
      setMakes(ogMakes)
      console.log(
        "string only contains whitespace (ie. spaces, tabs or line breaks)"
      )
    }

    if (ogMakes.includes(event.target.value)) {
      makeAlfa(event.target.value)
      setMakes(ogMakes)
    }
  }

  function handleMakeSubmit() {
    if (ogMakes.includes(make)) {
      console.log("INITIATING DATABSE SEARCH FOR VEHICLES OF MAKE: ", make)
      console.log("beep beep boop here is the result: ", ogModels[make].models)
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
                  placeholder="MAKE"
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
                    <div
                      key={index}
                      onClick={() => makeAlfa(el)}
                      className="make-item"
                    >
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
          onClick={handleMakeSubmit}
          className={
            ogMakes.includes(make) ? "search-submit-ready" : "search-submit"
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
