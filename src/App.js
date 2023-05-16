import { useState } from "react"
import Display from "./components/display/Display"
import Wrapper from "./components/wrapper/Wrapper"
import ButtonWrapper from "./components/buttonWrapper/ButtonWrapper"
import Button from "./components/button/Button"

const buttonValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
const removeSpaces = (num) => num.toString().replace(/\s/g, "")

const math = (a, b, sign) => 
sign === "+"
? a + b
: sign === "-"
? a - b
: sign === "X"
? a * b
: a / b

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0
  })


  const numClickHandler = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML

    if(removeSpaces(calc.num).length < 16){
      setCalc({
        ...calc,
        num: 
          calc.num === 0 && value === "0"
          ? "0"
          : calc.num % 1 === 0
          ? Number(calc.num + value)
          : calc.num + value,
          res: !calc.sign ? 0 : calc.res
      })
    }
  }

  const commaClickHandler = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num
    })
  }

  const signClickHandler = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num : 0
    })
  }

  const equalsClickHandler = (e) => {
    if(calc.sign && calc.num){
 

      setCalc({
        ...calc,
        res: 
        calc.num === "0" && calc.sign === "/"
          ? "can't divide with 0"
          : toLocaleString(math(
            Number(removeSpaces(calc.res)),
            Number(removeSpaces(calc.num)),
            calc.sign
          )),
          sign: "",
          num : 0
      })
    }
  }

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: ""
    })
  }

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: ""
    })
  }

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0
    })
  }

  

  return (
    <div>
      <Wrapper>
        <Display value={calc.num ? calc.num : calc.res} />
        <ButtonWrapper>
          {buttonValues.flat().map((button, i) => {
            return (
            <Button 
              key={i}
              className={button === "=" ? "equals" : ""}
              value={button}
              onClick={
                button === "C"
                ? resetClickHandler
                : button === "+-"
                ? invertClickHandler
                : button === "%"
                ? percentClickHandler
                : button === "="
                ? equalsClickHandler
                : button === "/" || button === "X" || button === "-" || button === "+"
                ? signClickHandler
                : button === "."
                ? commaClickHandler
                : numClickHandler
              }
            />
            )
          })}
        </ButtonWrapper>
      </Wrapper>
    </div>
    )
}
export default App