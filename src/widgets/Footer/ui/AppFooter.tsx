import styles from "./AppFooter.module.scss"
import MUILink from "@mui/material/Link/Link"
import Typography from "@mui/material/Typography"

type AppFooterProps = {}

export const AppFooter = (props: AppFooterProps) => {
  const {} = props
  return (
    <footer className={styles.footer}>
      <div>
        <Typography variant="h6">Contact</Typography>
        <ul>
          <MUILink href="mailto:nikita.ozhegov8@mail.ru">
            nikita.ozhegov8@mail.ru
          </MUILink>
        </ul>
      </div>
      <div>
        <Typography variant="h6">Build version</Typography>
        <Typography align="right">{__BUILD_VERSION__}</Typography>
      </div>
    </footer>
  )
}
