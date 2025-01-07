import buildProps  from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"

export const nm = useNmSpace('logConsole')


export const logProps = buildProps({

    maxSize: {
        type: [Number, String],
        default: 10000
    },
    itemHieght: {
        type: [Number, String],
        default: 40
    },
    height: {
        type: [Number, String],
        default: 400
    },
    isClear: {
        type: Boolean,
        default: true
    },
    prefixDist: {
        type: Object
    },
    addModel: {
        // 新日志的添加模式
        type: String,
        default: 'append'
    }
})

// export const emits =['update:modelValue','change','open','subOpen']
