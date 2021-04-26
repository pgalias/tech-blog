import React from "react"
import { unescape } from "lodash"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwlLight"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import * as styles from "./code-block.module.scss"

export const ReadonlyCodeBlock = ({ code, language }) => (
  <div className={styles.codeBlockEditorReadonly}>
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
  </div>
)

const LiveCodeBlock = ({ code }) => (
  <LiveProvider code={code} theme={theme}>
    <div className={styles.codeBlockEditor}>
      <LiveEditor />
    </div>
    <div className={styles.codeBlockResult}>
      <div className={styles.codeBlockResultTitle}>Preview:</div>
      <LivePreview />
    </div>
    <LiveError />
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

  console.log(isLive(codeBlock), codeBlock.classList)
  if (isReact(language) && isLive(codeBlock)) {
    return <LiveCodeBlock code={code} />
  }

  return <ReadonlyCodeBlock code={code} language={language} />
}
