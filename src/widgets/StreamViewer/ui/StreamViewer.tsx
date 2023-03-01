import { classNames } from "@/shared/lib/classNames/classNames"
import { PropsWithChildren } from "react"
import styles from "./StreamViewer.module.scss"

type StreamViewerProps = {
  className?: string
} & PropsWithChildren

export const StreamViewer = (props: StreamViewerProps) => {
  const { children, className } = props
  // const childrenArr = Children.toArray(children)

  // const totalRows = Math.round(Math.sqrt(childrenArr.length))
  // const rows = sliceIntoTotalChunks(childrenArr, totalRows)

  return (
    <div className={classNames([styles.StreamViewer, className])}>
      {/* {rows.map((rowChildren, index) => (
        <div
          key={`${totalRows}-${index}-${rowChildren.length}`}
          className={styles.row}
        >
          {rowChildren}
        </div>
      ))} */}
      {children}
    </div>
  )
}
