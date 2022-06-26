<template>
  <component :is="TranslationComponent" v-bind="attrs" v-if="renderComponent"/>
  <image-editor :id="attrs.value" v-model="isOpened" />
  <Span>Edit Image: </Span>
  <v-button
      v-if="attrs.value"
      v-tooltip.bottom="Resize"
      rounded
      icon
      secondary
      @click="isOpened = true"
  >
    <v-icon name="tune" />
  </v-button>

</template>

<script lang="ts">
import {useApi, useExtensions} from "@directus/extensions-sdk";
import { defineComponent } from "@vue/runtime-core";
import ImageEditor from "./image-editor";
import {nextTick, ref, watch} from "vue";

export default defineComponent({
  components: {ImageEditor},
  setup(props, {attrs, emit}) {
    const { interfaces } = useExtensions();
    const { component: TranslationComponent } = interfaces.value.find(
        (i) => i.id === "file-image"
    );
    const api = useApi();
    const isOpened = ref(false);
    const renderComponent = ref(true);

    watch(isOpened, (isOpenedCurrent, isOpenedLast) => {
      if (!isOpenedCurrent && isOpenedLast) {
        renderComponent.value = false;

        nextTick(() => {
          renderComponent.value = true;
        });
      }
    })

    return {
      renderComponent,
      isOpened,
      api,
      attrs,
      TranslationComponent,
    };
  }
})

</script>

<style lang="scss" scoped>
.image-preview {
  position: relative;
  width: 100%;
  height: var(--input-height-tall);
  overflow: hidden;
  background-color: var(--background-normal-alt);
  border-radius: var(--border-radius);
}
img {
  z-index: 1;
  width: 100%;
  height: 100%;
  max-height: inherit;
  object-fit: contain;
}
.is-svg {
  padding: 32px;
  img {
    object-fit: contain;
  }
}
.image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--foreground-subdued);
  background-color: var(--background-normal);
  padding: 32px;
  .v-icon {
    margin-bottom: 6px;
  }
  .message {
    max-width: 300px;
    padding: 0 16px;
    text-align: center;
  }
}
.shadow {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 40px;
  overflow: hidden;
  line-height: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: linear-gradient(180deg, rgb(38 50 56 / 0) 0%, rgb(38 50 56 / 0.25) 100%);
  transition: height var(--fast) var(--transition);
}
.actions {
  --v-button-color: var(--foreground-subdued);
  --v-button-background-color: var(--white);
  --v-button-color-hover: var(--foreground-normal);
  --v-button-background-color-hover: var(--white);
  position: absolute;
  top: calc(50% - 32px);
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  width: 100%;
  .v-button {
    margin-right: 12px;
    transform: translateY(10px);
    opacity: 0;
    transition: var(--medium) var(--transition);
    transition-property: opacity transform;
    @for $i from 0 through 4 {
      &:nth-of-type(#{$i + 1}) {
        transition-delay: $i * 25ms;
      }
    }
  }
  .v-button:last-child {
    margin-right: 0px;
  }
}
.info {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  padding: 8px 12px;
  line-height: 1.2;
}
.title {
  color: var(--white);
}
.meta {
  height: 17px;
  max-height: 0;
  overflow: hidden;
  color: rgb(255 255 255 / 0.75);
  transition: max-height var(--fast) var(--transition);
}
.image-preview:focus-within,
.image-preview:hover {
  .shadow {
    height: 100%;
    background: linear-gradient(180deg, rgb(38 50 56 / 0) 0%, rgb(38 50 56 / 0.5) 100%);
  }
  .actions .v-button {
    transform: translateY(0px);
    opacity: 1;
  }
  .meta {
    max-height: 17px;
  }
}
.image {
  &.full,
  &.fill {
    .image-preview {
      height: auto;
      max-height: 400px;
    }
  }
  &.crop {
    .image-preview {
      img {
        object-fit: cover;
      }
    }
  }
}
.disabled-placeholder {
  height: var(--input-height-tall);
}
.fallback {
  background-color: var(--background-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--input-height-tall);
  border-radius: var(--border-radius);
}
</style>
