'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}


{
  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author';
  const optTagsListSelector = '.tags.list';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';
  const optAuthorsListSelector = '.authors';

  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element & get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  }

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 1,
    };
    for (let tag in tags) {
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
    }
    return params;
  }

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>' + ' ';

        /* add generated code to html variable */
        html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags.hasOwnProperty(tag)) {
          /* [NEW] add generated code to allTags pbject */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      const links = document.querySelectorAll('.tags a');

      for (let link of links) {
        link.addEventListener('click', titleClickHandler);
      }
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    const tagsParams = calculateTagsParams(allTags);
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
    /* [NEW] START LOOP: for each tag in all Tags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTags: */
      const tagLinkHTML = '<a class="' + calculateTagClass(allTags[tag], tagsParams) + '" ' + ' ' + 'href="#tag-' + tag + '"><span>' + tag + '</a>' + ' (' + allTags[tag] + ') ' + '</span>' + ' ';
      allTagsHTML += tagLinkHTML;
    }
    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }


  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeLinkTag = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTag of activeLinkTag) {
      /* remove class active */
      activeTag.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of allTagLinks) {

      /* add class active */
      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a, .tags a');

    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    }
  }

  addClickListenersToTags();

  function generateAuthors() {
    let allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      let html = '';
      const articleAuthor = article.getAttribute('data-author');
      const linkHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>' + ' ';
      html = html + linkHTML;

      if (!allAuthors.hasOwnProperty(articleAuthor)) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      authorWrapper.innerHTML = html;
      const links = document.querySelectorAll('.authors a');

      for (let link of links) {
        link.addEventListener('click', titleClickHandler);
      }
    }

    const authorsList = document.querySelector(optAuthorsListSelector);
    const authorsParams = calculateTagsParams(allAuthors);
    let allAuthorsHTML = '';

    for (let author in allAuthors) {
      const authorLinkHTML = '<li><a class="' + calculateTagClass(allAuthors[author], authorsParams) + '" ' + ' ' + 'href="#author-' + author + '"><span>' + author + '</a>' + ' (' + allAuthors[author] + ') ' + '</span></li>' + ' ';
      allAuthorsHTML += authorLinkHTML;
    }
    authorsList.innerHTML = allAuthorsHTML;
  }

  generateAuthors();

  function addClickListenersToAuthors() {
    const links = document.querySelectorAll('.post-author a, .authors a');
    for (let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
  }

  addClickListenersToAuthors();

  function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');

    const tag = href.replace('#author-', '');
    const activeLinkTag = document.querySelectorAll('a.active[href^="#author-"]');

    for (let activeTag of activeLinkTag) {
      activeTag.classList.remove('active');
    }
    const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let tagLink of allTagLinks) {
      tagLink.classList.add('active');

    }
    generateTitleLinks('[data-author="' + tag + '"]');
  }

}
