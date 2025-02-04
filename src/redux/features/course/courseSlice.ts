import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type coursesStateType = {
    courses: Course[]
    filters: JsonB
    filteredCourses: Course[]
}

const initialState: coursesStateType = {
    courses: [],
    filters: {
        rating: 0,
        language: [],
        videoDuration: [],
        features: [],
        topic: [],
        level: [],
        subtitle: [],
        price: [],
    },
    filteredCourses: [],
}

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        updateFilters: (state, action: PayloadAction<Filter>) => {
            state.filters = action.payload
        },
        filterCourses: {
            reducer: (state, action: PayloadAction<Course[]>) => {
                state.filteredCourses = action.payload
            },
            prepare: (courses: Course[], filters: Filter) => {
                let filteredCourses: Course[] = []
                const { rating, price, language, videoDuration, features, topic, level, subtitle } = filters
                filteredCourses = courses.filter((course: Course) => {
                    if (course.starsRating < rating) return false
                    if (price.length) {
                        if (price.length !== 2) {
                            if (price.indexOf('paid') !== -1 && course.price === 0) return false
                            if (price.indexOf('free') !== -1 && course.price > 0) return false
                        }
                    }
                    if (language.length) {
                        if (language.indexOf(course.language) === -1) return false
                    }
                    if (subtitle.length) {
                        if (!subtitle.some((subtitle) => course.subtitle.indexOf(subtitle) !== -1)) return false
                    }
                    if (topic.length) {
                        if (!topic.some((topic) => course.topic.indexOf(topic) !== -1)) return false
                    }
                    if (level.length) {
                        if (level.indexOf('all') === -1) {
                            if (!level.some((level) => course.level.indexOf(level) !== -1)) return false
                        }
                    }
                    if (features.length) {
                        if (!features.some((features) => course.features.indexOf(features) !== -1)) return false
                    }
                    if (videoDuration.length) {
                        const lengthInHours = course.time / 60
                        if (
                            !videoDuration.some(
                                (duration) => duration.min < lengthInHours && duration.max > lengthInHours,
                            )
                        )
                            return false
                    }

                    return true
                })

                return { payload: filteredCourses }
            },
        },
    },
})
export const { updateFilters, filterCourses } = courseSlice.actions
export const coursesState = (state: { course: { courses: coursesStateType } }) => state.course
export default courseSlice.reducer
