import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCourseApi } from '../api/course-api';
import { Course, Lesson } from '../dto/Course';
import ReactPlayer from 'react-player'
import '../components/styles/courseContentStyle.css'
import { useQuery } from "react-query";

export const CoursePage = () => {
	const { id } = useParams();
	const { status, data: course } = useQuery(["course", id],
		async () => {
			return await getCourseApi(id!);
		},
		{
			onSuccess: (course: Course) => {
				setCurrentLesson(course.lessons[0]);
			}
		});

	const [currentLesson, setCurrentLesson] = useState(course?.lessons[0])

	const handleVideoChange = (lesson: Lesson) => {
		if (lesson.status === "locked") {
			return;
		}

		setCurrentLesson(lesson)
	}

	return (
		<main className='course-page-app-content'>
			{status === 'success' && (
				<div>
					<h1 className='course-page-title'>{course?.title}</h1>
					<div className='course-page-description'>{course?.description}</div>
					<div className='course-page-lesson-video'>
						<ReactPlayer
							url={currentLesson?.link}
							controls={true}
							height={700}
							width={1190}
						/>
					</div>
					<div className="course-page-lessons">
						<ol className="course-page-lessons-list">
							{course?.lessons.map(lesson => {
								return (
									<li
										className={`lesson-video-link 
							${lesson.status === "locked" ? "lesson-disabled" : "lesson-unlocked"}
							${lesson.id === currentLesson?.id ? "current-lesson" : ""}
							`}
										key={lesson.id}
										onClick={() => handleVideoChange(lesson)}>{lesson.title}
									</li>
								)
							})}
						</ol>
					</div>
				</div>
			)}

		</main>
	)
}

