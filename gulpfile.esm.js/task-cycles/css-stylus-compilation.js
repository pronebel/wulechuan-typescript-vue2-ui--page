import postCSS from 'gulp-postcss'
import gulpStylus from 'gulp-stylus'

import {
    createATaskCycle,
} from '@wulechuan/gulp-classical-task-cycle'

import getPluginsForOnePostCSSInstance
    from '../utilities/get-plugins-for-one-postcss-instance'



export function createOneTaskCycleForCompilingStylusOfOneTheme(taskCycleConfig) {
    const {
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,
        sourceGlobs,
        outputFiles,
        compressions = {},

        extraOptions: {
            shouldDiscardMostCommentsEvenIfNotCompressCSS,
        } = {},
    } = taskCycleConfig

    const _shouldDiscardComments = !!shouldDiscardMostCommentsEvenIfNotCompressCSS

    const compressorOptions1 = getPluginsForOnePostCSSInstance(false, _shouldDiscardComments)
    const compressorOptions2 = getPluginsForOnePostCSSInstance(true)

    const compressor1 = postCSS
    const compressor2 = postCSS

    return createATaskCycle({
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,

        sourceGlobs,
        outputFiles,
        firstPipeForProcessingSources: gulpStylus,

        compressions: {
            ...compressions,

            compressor1IsEnabled: _shouldDiscardComments,
            compressor1,
            compressorOptions1,

            compressor2IsDisabled: false,
            compressor2,
            compressorOptions2,
        },
    })
}
