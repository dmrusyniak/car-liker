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

          if (!search(testRef.current.value, ogMakes).length) {
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
  const wrapperRef2 = useRef(null)
  const testRef = useRef()
  const testRef2 = useRef()
  const makeRef = useRef()
  useOutsideAlerter(wrapperRef)
  useOutsideAlerterModels(wrapperRef2)

  const [makes, setMakes] = useState(ogMakes)
  const [make, setMake] = useState("MAKE")
  const [makeMenu, setMakeMenu] = useState(false)

  const [models, setModels] = useState(null)
  const [model, setModel] = useState("MODEL")
  const [modelMenu, setModelMenu] = useState(false)

  function openMake() {
    // setMake("")

    setMakes(ogMakes)
    // testRef.current.value = ""
    if (testRef.current.value) {
      setMakes(search(testRef.current.value, ogMakes))
    }
    // if (testRef2.current.value) {
    //   testRef2.current.value = ""
    //   setModel("MODEL")
    // }
    setMakeMenu(true)
  }

  function openModel() {
    // setMake("")
    if (ogModels[make]) {
      setModels(search(testRef2.current.value, ogModels[make].models))
      setModelMenu(true)
    }
    // testRef.current.value = ""
    // if (testRef.current.value) {
    //   setMode(makes.filter(word => word[0] === testRef.current.value[0]))
    // }
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

  function useOutsideAlerterModels(ref) {
    useEffect(() => {
      /**
       * close if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setModelMenu(false)
          setModels(null)
          console.log(ogModels)
          console.log(make)
          if (ogModels[testRef.current.value]) {
            if (
              search(
                testRef2.current.value,
                ogModels[testRef.current.value].models
              ).length < 1
            ) {
              testRef2.current.value = ""
              setModel("MODEL")
            }
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

  function makeAlfa(el) {
    setMake(el)
    testRef.current.value = el
    setMakeMenu(false)
    setMakes(ogMakes)
  }

  function makeBrera(el) {
    setModel(el)
    testRef2.current.value = el
    setModelMenu(false)
    setModels(ogModels[make].models)
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
    if (testRef2.current.value) {
      testRef2.current.value = ""
      setModel("MODEL")
    }
  }

  function handleModelChange(event) {
    event.preventDefault()
    event.target.value = event.target.value.toUpperCase()

    if (ogModels[make]) {
      setModels(ogModels[make].models)

      setModelMenu(true)
      // setModel(event.target.value)
      console.log("inputchange")
      console.log("event.target.value: ", event.target.value)

      setModels(search(event.target.value, ogModels[make].models))

      console.log("ok I set MODELS officially: ", models)
      if (event.target.value === "" || event.target.value === " ") {
        setModels(ogModels[make].models)
      }
      if (!event.target.value.replace(/\s/g, "").length) {
        setModels(ogModels[make].models)
        console.log(
          "string only contains whitespace (ie. spaces, tabs or line breaks)"
        )
      }

      if (ogModels[make].models.includes(event.target.value)) {
        makeBrera(event.target.value)
        setModels([make].models)
      }
    }
  }

  function joke() {}
  console.log("MAKE: ", make)

  function handleMakeSubmit() {
    if (ogMakes.includes(make)) {
      console.log("INITIATING DATABSE SEARCH FOR VEHICLES OF MAKE: ", make)
      console.log("beep beep boop here is the result: ", ogModels[make].models)
      setModels(ogModels[make].models)
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
        <div
          ref={wrapperRef2}
          className={make === "MAKE" ? "search-model" : "search-model-ready"}
        >
          <div onClick={openModel} className="model-flex">
            <form>
              <input
                type="text"
                placeholder="MODEL"
                onChange={handleModelChange}
                ref={testRef2}
                disabled={ogModels[make] ? "" : "disabled"}
                className="input"
              ></input>
            </form>
            <div className="drop-down-arrow">
              <img src={downArrow}></img>
            </div>
          </div>
          <div className="drop-down-bg">
            {modelMenu && models ? (
              models.map((el, index) => (
                <div>
                  <div
                    key={index}
                    onClick={() => makeBrera(el)}
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
      {models}
    </Layout>
  )
}

export default IndexPage
