import { Row, Col } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCourseApi } from '../api/course-api';
import { Course, Lesson } from '../dto/Course';
import ReactPlayer from 'react-player'
import { STUB_COURSE_DETAILS } from '../api/data-course-details';
import '../components/styles/courseContentStyle.css'

export const CoursePage = () => {
	const { id } = useParams();
	const course = STUB_COURSE_DETAILS;
	const [currentLesson, setCurrentLesson] = useState(course?.lessons[0])
	// const [course, setCourse] = useState<Course | null>(null)

	// useEffect(() => {
	// 	async function getCourse() {
	// 		const course = await getCourseApi(id!);
	// 		setCourse(course)
	// 	}
	// 	getCourse();

	// }, [id]);
	const handleVideoChange = (lesson: Lesson) => {
		if (lesson.status === "locked") {
			return;
		}

		setCurrentLesson(lesson)

	}

	return (
		<main className='course-page-app-content'>
			<h1 className='course-page-title'>{course?.title}</h1>
			<div className='course-page-description'>{course?.description}</div>
			<div className='course-page-video-lessons'>
				<ReactPlayer
					url={currentLesson.link}
					controls={true}
				/>
			</div>
			<ol className="course-page-lessons-list">
				{course?.lessons.map(lesson => {
					return (
						<li
							className={`lesson-video-link 
							${lesson.status === "locked" ? "lesson-disabled" : ""}
							${lesson.id === currentLesson.id ? "current-lesson" : ""}
							`}
							key={lesson.id}
							onClick={() => handleVideoChange(lesson)}>{lesson.title}
						</li>
					)
				})}
			</ol>

		</main>
	)
}
