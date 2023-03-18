import { Row, Col } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCourseApi } from '../api/course-api';
import { Course } from '../dto/Course';
import ReactPlayer from 'react-player'
import LessonsOfTheCourse from '../components/LessonsOfTheCourse';
import { STUB_COURSE_DETAILS } from '../api/data-course-details';
import '../components/styles/courseContentStyle.css'

export const CoursePage = () => {
	const { id } = useParams();
	const course = STUB_COURSE_DETAILS;
	// const [course, setCourse] = useState<Course | null>(null)

	// useEffect(() => {
	// 	async function getCourse() {
	// 		const course = await getCourseApi(id!);
	// 		setCourse(course)
	// 	}
	// 	getCourse();

	// }, [id]);

	return (
		<main className='course-page-app-content'>
			<h1 className='course-page-title'>{course?.title}</h1>
			<div className='course-page-description'>{course?.description}</div>
			<div className='course-page-video-lessons'>

				<ReactPlayer
					url={course?.meta.courseVideoPreview?.link}
					controls={true}
				/>
			</div>

		</main>
	)
}
