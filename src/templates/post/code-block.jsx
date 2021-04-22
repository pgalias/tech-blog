import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import * as decibel from "@decibel/components"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"

export const ReadonlyCodeBlock = ({ code, language }) => (
  <Highlight {...defaultProps} code={code} language={language} theme={theme}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
)

const LiveCodeBlock = ({ code }) => (
  <LiveProvider code={code} scope={{ Button: decibel.Button }} theme={theme}>
    <LiveEditor />
    <LiveError />
    <LivePreview />
  </LiveProvider>
)

const getLanguage = cb =>
  Array.from(cb.classList)
    .map(c => (c.startsWith("language-") ? c.replace("language-", "") : ""))
    .filter(c => c)[0]

const isReact = l => l === "javascript"
const isLive = cd => Array.from(cd.classList).includes("live")

export const CodeBlock = ({ codeBlock }) => {
  const language = getLanguage(codeBlock)
  const code = unescape(codeBlock.innerHTML)

  if (isReact(language) && isLive(codeBlock)) {
    return <LiveCodeBlock code={code} />
  }

  return <ReadonlyCodeBlock code={code} language={language} />
}
