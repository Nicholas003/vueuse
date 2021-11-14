import { defineComponent, h } from 'vue-demi'
import { useVirtualList, UseVirtualListOptions } from '@vueuse/core'

export interface UseVirtualListProps {
  /**
   * data of scrollable list
   *
   * @default []
   */
  list: Array<any>
  /**
   * useVirtualList's options
   *
   * @default {}
   */
  options: UseVirtualListOptions
  /**
   * virtualList's height
   *
   * @default 300px
   */
  height: string
}

export const UseVirtualList = defineComponent<UseVirtualListProps>({
  name: 'UseVirtualList',
  props: [
    'list',
    'options',
    'height',
  ] as unknown as undefined,
  setup(props, { slots }) {
    const { list, containerProps, wrapperProps } = useVirtualList(
      props.list,
      props.options,
    )

    containerProps.style.height = props.height || '300px'
    return () => h('div',
      { ...containerProps },
      [
        h('div',
          { ...wrapperProps.value },
          list.value.map((item: any) => h('div',
            { style: { overFlow: 'hidden', height: item.height } },
            slots.default ? slots.default(item) : 'Please set content!',
          )),
        ),
      ],
    )
  },
})