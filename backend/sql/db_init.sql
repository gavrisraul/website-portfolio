CREATE DATABASE IF NOT EXISTS website;

USE website;

ALTER DATABASE website CHARACTER SET utf8;
ALTER TABLE email CONVERT TO CHARACTER SET utf8;
ALTER TABLE hero CONVERT TO CHARACTER SET utf8;
ALTER TABLE links CONVERT TO CHARACTER SET utf8;
ALTER TABLE post CONVERT TO CHARACTER SET utf8;
ALTER TABLE postlikes CONVERT TO CHARACTER SET utf8;

INSERT IGNORE hero (id, name, surname, hero_image, hero_profession, hero_description, resume_label, trademarks) VALUES (1, 'Gavriș', 'Raul', 'https://raw.githubusercontent.com/gavrisraul/website-portfolio/master/frontend/assets/raul.png', 'Software Developer', 'Hello, my name is Raul Gavriș. I am a Software Developer and this is my website. Go checkout my <a href="/portfolio">portfolio</a> or <a href="/blog">blog</a> posts to know more about me! If you want something done in code, <a href="/contact">contact me!</href>', 'Resume', 'Raul Gavriș © 2020');

INSERT INTO links (id, url, label) VALUES (1, '/about', 'About');
INSERT INTO links (id, url, label) VALUES (2, '/blog', 'Blog');
INSERT INTO links (id, url, label) VALUES (3, '/portfolio', 'Portfolio');
INSERT INTO links (id, url, label) VALUES (4, '/contact', 'Contact');
INSERT INTO links (id, url, label) VALUES (5, '/destroy', 'Destroy');
INSERT INTO links (id, url, label) VALUES (6, 'https://github.com/gavrisraul', 'github');
INSERT INTO links (id, url, label) VALUES (7, 'https://www.linkedin.com/in/gavris-raul-b0796a125', 'linkedin');
INSERT INTO links (id, url, label) VALUES (8, 'https://www.facebook.com/rg.raulgavris', 'facebook');
INSERT INTO links (id, url, label) VALUES (9, 'https://www.instagram.com/raul_gavris/', 'instagram');
INSERT INTO links (id, url, label) VALUES (10, 'https://www.youtube.com/channel/UC8zs6y6zyId75_EYzAjgRjA', 'youtube');
INSERT INTO links (id, url, label) VALUES (11, 'https://docs.google.com/document/d/1cCAD423vpQx2Nx8Bg0oH_kSVi3r2WCmfH6QfNee4EDM', 'resume');

INSERT INTO post (id, title, text, image, date, likes) VALUES (1, 'Blog Post 1 - Hello World!', 'TBA', 'https://raw.githubusercontent.com/gavrisraul/website-portfolio/master/frontend/assets/blog-post-image.png', '2020-2-29', '0');

INSERT INTO post (id, title, text, image, date, likes) VALUES (2, 'Blog Post 2 - Git tutorial', 'TBA', 'https://raw.githubusercontent.com/gavrisraul/website-portfolio/master/frontend/assets/blog-post-image.png', '2020-3-10', '0');

UPDATE post SET text=LOAD_FILE('/var/lib/mysql-files/Post1.md') WHERE id=1;

UPDATE post SET text=LOAD_FILE('/var/lib/mysql-files/Post2.md') WHERE id=2;