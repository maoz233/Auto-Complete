import React, { useState, useEffect } from 'react'
import { debounce } from 'lodash'

function AutoComplete() {
  const [user, setUser] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [text, setText] = useState('')

  const handleSuggestions = (val) => {
    let suggestion = []
    let suggestionName = []
    if (val.length > 0) {
      let template = new RegExp(`^${val}`, 'i')
      suggestion = user.filter((item) => template.test(item.name))
    }
    suggestion.forEach((item) => suggestionName.push(item.name))
    suggestionName.sort()
    setSuggestions(suggestionName)
  }

  const debounceSuggestion = debounce((val) => handleSuggestions(val), 1000)

  const handleInput = (e) => {
    const val = e.target.value
    setText(val)
    if (val.length < text.length) {
      // without debounce
      handleSuggestions(val)
    } else {
      // with debounce
      debounceSuggestion(val)
    }
  }

  const selectSuggestion = (text) => {
    setText(text)
    setSuggestions([])
  }

  const outputSuggestion = () => {
    return (
      <ul>
        {console.log(suggestions)}
        {suggestions.map((item, index) => (
          <li key={item + index} onClick={() => selectSuggestion(item)}>
            {item}
          </li>
        ))}
      </ul>
    )
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((res) => {
        setUser(res)
      })
  }, [])

  return (
    <>
      <input value={text} onChange={handleInput} />
      {outputSuggestion()}
    </>
  )
}

export default AutoComplete
