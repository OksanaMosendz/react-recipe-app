import styles from "./About.module.css";
function About() {
  return (
    <section className={styles.about_section}>
      <h2 className={styles.about_title}>Welcome to Cookbook! </h2>
      <p className={styles.about_info}>
        A cozy place to discover new recipes and enjoy cooking every day. You
        can create your own recipes, edit them, and keep them in your personal
        Cookbook. Your saved recipes are stored in the browser, so they remain
        available even after refreshing the page.
      </p>
    </section>
  );
}

export default About;
