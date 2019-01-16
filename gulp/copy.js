import gulp from 'gulp';
// import safeSymlink from './safeSymlink';

// let $g = require('gulp-load-plugins')();
//var frontMatter = require('gulp-front-matter');

const copyMarkdown = () => {
  return new Promise((resolve, reject) => {
    // Symlink files
    // safeSymlink("./src/images", "./static/images");

    // Copy files.
    gulp.src(['./markdown/docs/**/*',
              './markdown/specs/**/*'
             ])
      .pipe(gulp.dest('./content/public/'));

    // Add DID-JWT work
    gulp.src(['./markdown/did-jwt/docs/**/*'])
      .pipe(gulp.dest('./content/public/did-jwt'));

    // Add Uport Connect
    gulp.src(['./markdown/uport-connect/docs/**/*'])
      .pipe(gulp.dest('./content/public/uport-connect'));

    // Add Uport Credentials
    gulp.src(['./markdown/uport-credentials/docs/**/*'])
      .pipe(gulp.dest('./content/public/uport-credentials'));

    // Add lambda-oloron (private chain support)
    // gulp.src(['./markdown/lambda-olorun/README.md'])
    //   .pipe(gulp.dest('./content/public/lambda-olorun'));

    // Add Ethr-did
    gulp.src(['./markdown/ethr-did/**/*'])
      .pipe(gulp.dest('./content/public/ethr-did'));

    //Add Ethr-did-resolver
    gulp.src(['./markdown/ethr-did-resolver/**/*'])
      .pipe(gulp.dest('./content/public/ethr-did-resolver'));

    //Add Ethr-did-registry
    gulp.src(['./markdown/ethr-did-registry/**/*'])
      .pipe(gulp.dest('./content/public/ethr-did-registry'));

    // Add muport-core-js
    gulp.src(['./markdown/muport-core-js/docs/**/*'])
      .pipe(gulp.dest('./content/public/muport-core-js'));

    // Add uport-transports
    gulp.src(['./markdown/uport-transports/docs/**/*'])
      .pipe(gulp.dest('./content/public/uport-transports'));

    resolve();
  });
}

export default copyMarkdown;
