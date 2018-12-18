import gulp from 'gulp';
import copyMarkdown from "./copy";

const watchMarkdown = () => {
  gulp.watch(["./markdown/**/*.md"], gulp.series(copyMarkdown));
}

export default watchMarkdown;
