import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import image1 from '../../Assests/image 1.svg'

interface NavbarProps {
  showItems: boolean
}
const Navbar = ({ showItems }: NavbarProps) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {/* Logo */}
        <Link to="/" className={styles.navbarLogoLink}>
          <img className={styles.navbarLogo} src={image1} alt="logo" />
        </Link>
        <h2 className={styles.NavTitle}>UpLift</h2>
        {showItems && (
          <nav className={styles.navbarLinks}>
            <a href="/">home</a>
            <a href="/pages/Reflections">Reflections</a>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar
