const cssStr = `/* 画一只蜘蛛 */
.spider {
  --spider-line: white;
  --spider-body-color: #523132;
  --spider-eye-color: white;
  --spider-width: 250px;
  width: var(--spider-width);
  margin-left: auto;
  margin-right: auto;
}

/* 大屏幕 大蜘蛛 */
@media (min-width:1000px) {
  .spider {
    --spider-width: 400px;
  }
}

/* 蜘蛛丝 */
.line {
  width: calc(var(--spider-width) * (2 / 380));
  height: calc(var(--spider-width) * (120 / 380));
  background: var(--spider-line);
  margin-left: auto;
  margin-right: auto;
}

/* 身体 */
.body {
  width: 100%;
  height: calc(var(--spider-width) * (400 / 380));
  margin-left: auto;
  margin-right: auto;
  background: var(--spider-body-color);
  border-radius: 50% 50% 50% 50%/55% 55% 45% 45%;
  position: relative;
}

/* 8 只小短腿 */
.legs {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.leg {
  width: calc(var(--spider-width) * (30 / 380));
  height: calc(var(--spider-width) * (70 / 380));
  background: var(--spider-body-color);
  position: absolute;
}
.leg.left {
  border-radius: 40% 0 0 40%/40% 0 0 40%;
}
.leg.right {
  border-radius: 0 40% 40% 0/0 40% 40% 0;
}
.leg.left.first {
  top: calc(var(--spider-width) * (-180 / 380));
  left: calc(var(--spider-width) * (-140 / 380));
  transform: rotate(45deg);
}
.leg.right.first {
  top: calc(var(--spider-width) * (-180 / 380));
  left: calc(var(--spider-width) * (110 / 380));
  transform: rotate(-45deg);
}
.leg.left.second {
  top: calc(var(--spider-width) * (-80 / 380));
  left: calc(var(--spider-width) * (-200 / 380));
  transform: rotate(15deg);
}
.leg.right.second {
  top: calc(var(--spider-width) * (-80 / 380));
  left: calc(var(--spider-width) * (170 / 380));
  transform: rotate(-15deg);
}
.leg.left.third {
  top: calc(var(--spider-width) * (60 / 380));
  left: calc(var(--spider-width) * (-195 / 380));
  transform: rotate(-28deg);
}
.leg.right.third {
  top: calc(var(--spider-width) * (60 / 380));
  left: calc(var(--spider-width) * (165 / 380));
  transform: rotate(28deg);
}
.leg.left.fourth {
  top: calc(var(--spider-width) * (140 / 380));
  left: calc(var(--spider-width) * (-130 / 380));
  transform: rotate(-60deg);
}
.leg.right.fourth {
  top: calc(var(--spider-width) * (140 / 380));
  left: calc(var(--spider-width) * (100 / 380));
  transform: rotate(60deg);
}

/* 眼睛 */
.eyes {
  position: relative;
  top: calc(var(--spider-width) * (265 / 380));
  text-align: center;
}
.eye {
  display: inline-block;
  width: calc(var(--spider-width) * (65 / 380));
  height: calc(var(--spider-width) * (80 / 380));
  background: var(--spider-eye-color);
  border-radius: 50% 50% 50% 50%/55% 55% 45% 45%;
  position: relative;
}
.eye.left {
  left: calc(var(--spider-width) * (10 / 380));
  transform: rotate(10deg);
  z-index: 1;
}
.eye.right {
  left: calc(var(--spider-width) * (-10 / 380));
  transform: rotate(-10deg);
}
.eye.left::before,
.eye.right::before {
  content: "";
  display: block;
  width: calc(var(--spider-width) * (30 / 380));
  height: calc(var(--spider-width) * (30 / 380));
  background: var(--spider-body-color);
  border-radius: 50%;
  position: relative;
}
.eye.left::before {
  top: calc(var(--spider-width) * (20 / 380));
  left: calc(var(--spider-width) * (28 / 380));
}
.eye.right::before {
  top: calc(var(--spider-width) * (25 / 380));
  left: calc(var(--spider-width) * (33 / 380));
}
/* 完成！ */`;

let time = 20;
typeTextToDOM({ addStr: cssStr });
listenToButtons();

function typeTextToDOM({ currentStr = "", addStr }) {
  const code = document.querySelector(".code");
  const style = document.querySelector(".style");
  let i = 0;
  setTimeout(function type() {
    const char = addStr.charAt(i);
    currentStr += char;
    const highlightedStr = Prism.highlight(currentStr, Prism.languages.css);
    if (char !== " " && char !== "\n") {
      code.innerHTML = highlightedStr;
    }
    if (char === "}") {
      style.innerHTML = currentStr;
    }
    code.scrollTop = code.scrollHeight;
    i++;
    if (i < addStr.length) {
      setTimeout(type, time);
    }
  }, time);
}

function listenToButtons() {
  document.querySelectorAll(".controller button").forEach(changeTime);
}

function changeTime(button) {
  button.addEventListener("click", (event) => {
    event.target.parentNode.childNodes.forEach((node) => {
      if (node.nodeType === 1) node.classList.remove("active");
    });
    event.target.classList.add("active");
    const speed = event.target.dataset.speed;
    const speedTable = {
      slow: 100,
      normal: 20,
      fast: 5,
    };
    time = speedTable[speed];
  });
}
