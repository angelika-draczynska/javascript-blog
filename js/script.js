'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorColumnLink: Handlebars.compile(document.querySelector('#template-author-column-link').innerHTML)
}
{

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



  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author';
  const optTagsListSelector = '.tags.list';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';
  const optAuthorsListSelector = '.authors';

  const articlesArray = [
    {
      id: 'article-1',
      author: 'Tom Hanks',
      tags: 'drama comedy',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum neque id nunc sollicitudin dictum. Etiam iaculis volutpat lectus quis viverra. Pellentesque sit amet porttitor felis, in tristique neque. Pellentesque eleifend dolor vitae est pretium, in tincidunt nisi feugiat. Etiam gravida dictum felis, et convallis sapien sagittis suscipit. Pellentesque tincidunt turpis quis aliquet aliquam. Proin sed facilisis massa. Maecenas gravida justo sit amet sapien malesuada pellentesque. Aenean eget elit vitae dui bibendum vehicula nec ac justo. Aliquam facilisis lorem tellus, ut porta sem dignissim vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus at nulla vel auctor. Fusce lorem turpis, sodales sed auctor vitae, tempor sed mauris. Sed nec convallis massa, eu interdum massa. Etiam ut efficitur massa, vitae varius nisi. Phasellus id metus a orci elementum porttitor a vitae nibh. ',
      title: 'Article 1'
    },
    {
      id: 'article-2',
      author: 'Marion Berry',
      tags: 'comedy musical',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum neque id nunc sollicitudin dictum. Etiam iaculis volutpat lectus quis viverra. Pellentesque sit amet porttitor felis, in tristique neque. Pellentesque eleifend dolor vitae est pretium, in tincidunt nisi feugiat. Etiam gravida dictum felis, et convallis sapien sagittis suscipit. Pellentesque tincidunt turpis quis aliquet aliquam. Proin sed facilisis massa. Maecenas gravida justo sit amet sapien malesuada pellentesque. Aenean eget elit vitae dui bibendum vehicula nec ac justo. Aliquam facilisis lorem tellus, ut porta sem dignissim vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus at nulla vel auctor. Fusce lorem turpis, sodales sed auctor vitae, tempor sed mauris. Sed nec convallis massa, eu interdum massa. Etiam ut efficitur massa, vitae varius nisi. Phasellus id metus a orci elementum porttitor a vitae nibh. ',
      title: 'Article 2',
    },
    {
      id: 'article-3',
      author: 'Leonardo Di Caprio',
      tags: 'action horror',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum neque id nunc sollicitudin dictum. Etiam iaculis volutpat lectus quis viverra. Pellentesque sit amet porttitor felis, in tristique neque. Pellentesque eleifend dolor vitae est pretium, in tincidunt nisi feugiat. Etiam gravida dictum felis, et convallis sapien sagittis suscipit. Pellentesque tincidunt turpis quis aliquet aliquam. Proin sed facilisis massa. Maecenas gravida justo sit amet sapien malesuada pellentesque. Aenean eget elit vitae dui bibendum vehicula nec ac justo. Aliquam facilisis lorem tellus, ut porta sem dignissim vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus at nulla vel auctor. Fusce lorem turpis, sodales sed auctor vitae, tempor sed mauris. Sed nec convallis massa, eu interdum massa. Etiam ut efficitur massa, vitae varius nisi. Phasellus id metus a orci elementum porttitor a vitae nibh. ',
      title: 'Article 3',
    },
    {
      id: 'article-4',
      author: 'Al Pacino',
      tags: 'horror',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum neque id nunc sollicitudin dictum. Etiam iaculis volutpat lectus quis viverra. Pellentesque sit amet porttitor felis, in tristique neque. Pellentesque eleifend dolor vitae est pretium, in tincidunt nisi feugiat. Etiam gravida dictum felis, et convallis sapien sagittis suscipit. Pellentesque tincidunt turpis quis aliquet aliquam. Proin sed facilisis massa. Maecenas gravida justo sit amet sapien malesuada pellentesque. Aenean eget elit vitae dui bibendum vehicula nec ac justo. Aliquam facilisis lorem tellus, ut porta sem dignissim vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus at nulla vel auctor. Fusce lorem turpis, sodales sed auctor vitae, tempor sed mauris. Sed nec convallis massa, eu interdum massa. Etiam ut efficitur massa, vitae varius nisi. Phasellus id metus a orci elementum porttitor a vitae nibh. ',
      title: 'Article 4',
    },
    {
      id: 'article-5',
      author: 'Marion Berry',
      tags: 'horror drama',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum neque id nunc sollicitudin dictum. Etiam iaculis volutpat lectus quis viverra. Pellentesque sit amet porttitor felis, in tristique neque. Pellentesque eleifend dolor vitae est pretium, in tincidunt nisi feugiat. Etiam gravida dictum felis, et convallis sapien sagittis suscipit. Pellentesque tincidunt turpis quis aliquet aliquam. Proin sed facilisis massa. Maecenas gravida justo sit amet sapien malesuada pellentesque. Aenean eget elit vitae dui bibendum vehicula nec ac justo. Aliquam facilisis lorem tellus, ut porta sem dignissim vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus at nulla vel auctor. Fusce lorem turpis, sodales sed auctor vitae, tempor sed mauris. Sed nec convallis massa, eu interdum massa. Etiam ut efficitur massa, vitae varius nisi. Phasellus id metus a orci elementum porttitor a vitae nibh. ',
      title: 'Article 5',
    },
    {
      id: 'article-6',
      author: 'Emilia Clarke',
      tags: 'romantic drama',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum neque id nunc sollicitudin dictum. Etiam iaculis volutpat lectus quis viverra. Pellentesque sit amet porttitor felis, in tristique neque. Pellentesque eleifend dolor vitae est pretium, in tincidunt nisi feugiat. Etiam gravida dictum felis, et convallis sapien sagittis suscipit. Pellentesque tincidunt turpis quis aliquet aliquam. Proin sed facilisis massa. Maecenas gravida justo sit amet sapien malesuada pellentesque. Aenean eget elit vitae dui bibendum vehicula nec ac justo. Aliquam facilisis lorem tellus, ut porta sem dignissim vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus at nulla vel auctor. Fusce lorem turpis, sodales sed auctor vitae, tempor sed mauris. Sed nec convallis massa, eu interdum massa. Etiam ut efficitur massa, vitae varius nisi. Phasellus id metus a orci elementum porttitor a vitae nibh. ',
      title: 'Article 6',
    },
    {
      id: 'article-7',
      author: 'Emma Stone',
      tags: 'musical comedy romantic',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum neque id nunc sollicitudin dictum. Etiam iaculis volutpat lectus quis viverra. Pellentesque sit amet porttitor felis, in tristique neque. Pellentesque eleifend dolor vitae est pretium, in tincidunt nisi feugiat. Etiam gravida dictum felis, et convallis sapien sagittis suscipit. Pellentesque tincidunt turpis quis aliquet aliquam. Proin sed facilisis massa. Maecenas gravida justo sit amet sapien malesuada pellentesque. Aenean eget elit vitae dui bibendum vehicula nec ac justo. Aliquam facilisis lorem tellus, ut porta sem dignissim vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus at nulla vel auctor. Fusce lorem turpis, sodales sed auctor vitae, tempor sed mauris. Sed nec convallis massa, eu interdum massa. Etiam ut efficitur massa, vitae varius nisi. Phasellus id metus a orci elementum porttitor a vitae nibh. ',
      title: 'Article 7',
    },
    {
      id: 'article-8',
      author: 'Emilia Clarke',
      tags: 'horror comedy',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum neque id nunc sollicitudin dictum. Etiam iaculis volutpat lectus quis viverra. Pellentesque sit amet porttitor felis, in tristique neque. Pellentesque eleifend dolor vitae est pretium, in tincidunt nisi feugiat. Etiam gravida dictum felis, et convallis sapien sagittis suscipit. Pellentesque tincidunt turpis quis aliquet aliquam. Proin sed facilisis massa. Maecenas gravida justo sit amet sapien malesuada pellentesque. Aenean eget elit vitae dui bibendum vehicula nec ac justo. Aliquam facilisis lorem tellus, ut porta sem dignissim vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus at nulla vel auctor. Fusce lorem turpis, sodales sed auctor vitae, tempor sed mauris. Sed nec convallis massa, eu interdum massa. Etiam ut efficitur massa, vitae varius nisi. Phasellus id metus a orci elementum porttitor a vitae nibh. ',
      title: 'Article 8',
    },
    {
      id: 'article-9',
      author: 'Emilia Clarke',
      tags: 'drama horror',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum neque id nunc sollicitudin dictum. Etiam iaculis volutpat lectus quis viverra. Pellentesque sit amet porttitor felis, in tristique neque. Pellentesque eleifend dolor vitae est pretium, in tincidunt nisi feugiat. Etiam gravida dictum felis, et convallis sapien sagittis suscipit. Pellentesque tincidunt turpis quis aliquet aliquam. Proin sed facilisis massa. Maecenas gravida justo sit amet sapien malesuada pellentesque. Aenean eget elit vitae dui bibendum vehicula nec ac justo. Aliquam facilisis lorem tellus, ut porta sem dignissim vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus at nulla vel auctor. Fusce lorem turpis, sodales sed auctor vitae, tempor sed mauris. Sed nec convallis massa, eu interdum massa. Etiam ut efficitur massa, vitae varius nisi. Phasellus id metus a orci elementum porttitor a vitae nibh. ',
      title: 'Article 9',
    },
    {
      id: 'article-10',
      author: 'Emilia Clarke',
      tags: 'musical',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum neque id nunc sollicitudin dictum. Etiam iaculis volutpat lectus quis viverra. Pellentesque sit amet porttitor felis, in tristique neque. Pellentesque eleifend dolor vitae est pretium, in tincidunt nisi feugiat. Etiam gravida dictum felis, et convallis sapien sagittis suscipit. Pellentesque tincidunt turpis quis aliquet aliquam. Proin sed facilisis massa. Maecenas gravida justo sit amet sapien malesuada pellentesque. Aenean eget elit vitae dui bibendum vehicula nec ac justo. Aliquam facilisis lorem tellus, ut porta sem dignissim vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus at nulla vel auctor. Fusce lorem turpis, sodales sed auctor vitae, tempor sed mauris. Sed nec convallis massa, eu interdum massa. Etiam ut efficitur massa, vitae varius nisi. Phasellus id metus a orci elementum porttitor a vitae nibh. ',
      title: 'Article 10',
    },

  ];

  createPosts();

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
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);

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
        const linkHTMLData = { id: tag, title: tag };
        const linkHTML = templates.tagLink(linkHTMLData);

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
    const allTagsData = { tags: [] };
    /* [NEW] START LOOP: for each tag in all Tags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTags: */
      //const tagLinkHTML = '<a class="' + calculateTagClass(allTags[tag], tagsParams) + '" ' + ' ' + 'href="#tag-' + tag + '"><span>' + tag + '</a>' + ' (' + allTags[tag] + ') ' + '</span>' + ' ';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);

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

    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }

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
      const linkHTMLData = { id: articleAuthor, title: articleAuthor };
      const linkHTML = templates.authorLink(linkHTMLData);
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
    const allAuthorsData = { authors: [] };

    for (let author in allAuthors) {
      //const authorLinkHTML = '<li><a class="' + calculateTagClass(allAuthors[author], authorsParams) + '" ' + ' ' + 'href="#author-' + author + '"><span>' + author + '</a>' + ' (' + allAuthors[author] + ') ' + '</span></li>' + ' ';
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateTagClass(allAuthors[author], authorsParams)
      });
    }
    authorsList.innerHTML = templates.authorColumnLink(allAuthorsData);
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

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let activeTag of activeTags) {
      activeTag.classList.remove('active');
    }

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

  document.querySelector('.cleaner').addEventListener('click', function clearFiltres() {
    const activeLinks = document.querySelectorAll('a.active');
    for (let i = 0; i < activeLinks.length; i++) {
      activeLinks[i].classList.remove('active')
    }
    generateTitleLinks();
  });

  function createPosts() {
    const postDiv = document.querySelector('.posts');
    for (let i = 0; i < articlesArray.length; i++) {
      const article = articlesArray[i];
      const mainArticleContainer = document.createElement('article');
      const postTitleDiv = document.createElement('h3');
      const postAuthorDiv = document.createElement('div');
      const postContentDiv = document.createElement('div');
      const tagDiv = document.createElement('div');
      const tagListUl = document.createElement('ul');
      tagListUl.className = 'list list-horizontal';
      postAuthorDiv.className = 'post-author';
      postContentDiv.className = 'post-content';
      postTitleDiv.className = 'post-title';
      postTitleDiv.innerHTML = article.title;
      tagDiv.className = 'post-tags';
      const tagParagraph = document.createElement('p');
      tagParagraph.innerHTML = 'Tags:';
      tagDiv.appendChild(tagParagraph);
      tagDiv.appendChild(tagListUl);
      mainArticleContainer.className = 'post';
      mainArticleContainer.id = articlesArray[i].id;
      mainArticleContainer.setAttribute('data-tags', articlesArray[i].tags);
      mainArticleContainer.setAttribute('data-author', articlesArray[i].author);
      postContentDiv.innerHTML = articlesArray[i].content;
      mainArticleContainer.appendChild(postTitleDiv);
      mainArticleContainer.appendChild(postAuthorDiv);
      mainArticleContainer.appendChild(postContentDiv);
      mainArticleContainer.appendChild(tagDiv);
      postDiv.appendChild(mainArticleContainer);
      if (articlesArray[i] === articlesArray[0]) {
        mainArticleContainer.className = 'post active';


      }
    }
  }
}
