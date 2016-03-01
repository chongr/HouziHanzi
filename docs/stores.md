# Flux Stores

### CharacterStore

Holds all current characters

##### Actions:
- `receiveLessonCharacters`
- `receiveSingleLessonCharacter`

##### Listeners:
- `LessonApp` (passes to `LessonApp` via props)

### ReviewStore

Holds all characters to review

##### Actions:
- `receiveAllReviewCharacters`
- `receiveSingleReviewCharacter`
- `createReviewCharacter`

##### Listeners:
- `ReviewApp` (passes to `ReviewApp` via props)
