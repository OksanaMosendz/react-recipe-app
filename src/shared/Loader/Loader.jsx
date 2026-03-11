import styles from './Loader.module.css';

function Loader(){

   return (
<div className={styles.loader}>
  <div className={styles.spinner}></div>
  <p>...Loading...</p>
</div>
   )
}

export default Loader;