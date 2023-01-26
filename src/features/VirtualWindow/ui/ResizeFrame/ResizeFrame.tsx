import { classNames } from "@/shared/lib/classNames/classNames"
import { memo } from "react"
import { PartsType } from "../../model/types/WindowParams"
import styles from "./ResizeFrame.module.scss"

type ResizeFrameProps = {
  onMouseDown: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    active: PartsType
  ) => void
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  resizable?: boolean
}

export const ResizeBorders: PartsType[] = [
  "top",
  "right",
  "bottom",
  "left",
  "left-top",
  "right-top",
  "left-bottom",
  "right-bottom",
  "body",
]
export const BorderBody: PartsType[] = ["body"]

export const ResizeFrame = memo((props: ResizeFrameProps) => {
  const { onMouseDown, onDoubleClick, resizable } = props

  return (
    <div className={styles.borders}>
      {ResizeBorders.map((border) => (
        <div
          key={border}
          onMouseDown={(e) => onMouseDown(e, border)}
          onDoubleClick={onDoubleClick}
          className={classNames(styles[border], {
            [styles.disabled]: !resizable,
          })}
        />
      ))}
      {BorderBody.map((borderBody) => (
        <div
          key={borderBody}
          onDoubleClick={onDoubleClick}
          className={classNames(styles[borderBody], {
            [styles.disabled]: resizable,
          })}
        />
      ))}
    </div>
  )
})
