import "@logseq/libs";

import "./index.css";

import uEmojiParser from 'universal-emoji-parser'

// @ts-expect-error
const css = (t, ...args) => String.raw(t, ...args);

async function main() {
  const observer = new MutationObserver((mutationList, observer) => {
    for (const m of mutationList) {
      for (const node of m.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement 

          for (const content of element.querySelectorAll('div.block-content') as NodeListOf<HTMLElement>) {
            // TODO: Make this only on text nodes? (only if it raises errors)
            content.innerHTML = uEmojiParser.parseToUnicode(content.innerHTML)
          }
        }
      }
    }
  })

  observer.observe(top!.document.body, {childList: true, subtree: true, })

  console.info('logseq-emoji-shortcodes loaded');
}

logseq.ready(main).catch(console.error);
