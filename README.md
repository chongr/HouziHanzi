# HouziHanzi

[Heroku link][heroku] **--Remember to Add Once Setup--**

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

HouziHanzi is a web application inspired by WaniKani built using Ruby on Rails
and React.js. HouziHanzi allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Learn small sets of Chinese characters as flashcards
- [ ] Test themselves after each set of flashcards by entering the English definition of the character
- [ ] Review characters after being tested on them
- [ ] See characters that were not remembered correctly during the review phase

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Lessons API (1.5 days)

**Objective:** The set of characters in a lesson can be fetched through the API.

- [ ] create `Characters` model
- [ ] seed the database with HSK level 1
- [ ] jBuilder views for grabbing each lesson
- [ ] setup Webpack & Flux scaffold to display lesson as JSON
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Lesson Quiz(1.5 days)

**Objective:** Users can take a quiz on the set of characters that was just learned.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- [ ] setup the quiz to proceed once all five are correct
- [ ] Save to the DB that the user may now review the characters after completing the quiz.
- [ ] Create a `Review` join table and model
- [ ] position elements on the page


### Phase 4: Start Styling (1 day)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] add basic colors & styles
- [ ] get bootstrap styles for pages

### Phase 5: Review Sessions (1 day)

**Objective:** Users can review characters that they have learned.

- [ ] Users are randomly tested on all characters that they have learned
- [ ] Reports stats on last review session based on which characters answered correctly and incorrectly
- [ ] incorrectly reviewed characters are put back in the pool of characters to review
- [ ] Use CSS on the quiz and review interface to improve visuals
- [ ] position elements on the page

### Phase 6: Summary Pages (1.5 days)

**Objective:** A summary page for lessons and reviews show information form the last lesson and review session.

- [ ] Create a `Last_Reviewed` model
- [ ] Display the last characters learned in the last lesson before entering a lesson session
- [ ] Display the last characters reviewed in the last review session before entering a review session
- [ ] position elements on the page


### Phase 7: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Fetch sample sentences for different characters
- [ ] icons and progress bar during a lesson or review session
- [ ] Spaced review of characters based on time
- [ ] Spaced unlocking of new characters based on time
- [ ] Track mastery of remembering characters
- [ ] Theme site with cute monkeys

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
