# educational-project
Educational project for Genesis Front-end school

Проєкт побудований на Type Script та React.

Demo проєкту на Netlify
https://stellar-wisp-c5bc99.netlify.app/

АРІ не працює через CORS policy.
Я використовувала localhost:3000, пробувала використовувати розширення для браузера Allow CORS, але помилка не зникає.

Access to XMLHttpRequest at 'http://api.wisey.app/api/v1/core/preview-courses/d7a759c4-652b-414f-aec7-c8c6fafec442' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: Redirect is not allowed for a preflight request.

Для того, щоб мати змогу побудувати проєкт, я використовувала mock та дані, скопійовані з АРІ вручну: STUB_COURSES_PREVIEW та STUB_COURSE_DETAILS.
STUB_COURSE_DETAILS має інформацію лише по одному курсу, тому при кліку на кнопку Open Course для будь-якого курсу буде завантажуватися одна й та сама інформація (уроки та відео).

Щоб побачити, як працює проєкт саме з даними з АРІ, у файлі course-api.ts потрібно закоментувати mocks для методів getCoursesPreviewApi та getCourseApi. Вони позначені коментарями 
// TODO remove mock when CORS issue will be fixed 

