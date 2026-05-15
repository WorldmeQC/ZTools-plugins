import download from 'downloadjs';
import { v4 as uuid } from 'uuid';
import { defineStore } from 'pinia';
import { namespace } from './useProjectStores';
import useTemplateStore from './useTemplateStore';
import { cloneDeep, replace } from 'lodash';

async function saveTextFile(text, filename) {
    if (window.services?.writeTextFile) {
        const filePath = await window.services.writeTextFile(text, filename);
        window.ztools?.showNotification?.(`Saved ${filename}`);
        return filePath;
    }

    return download(text, filename);
}

export default function (id) {
    return defineStore(id, {
        state: () => ({
            version: '1.26.1',
            modified: false,
            page: {},
            settings: {},
            viewport: {
                x: 0,
                y: -150,
                zoom: 1,
            },
            tab: {
                order: 0,
                name: null,
                created_at: new Date(),
                id: replace(id, namespace, ''),
            },
        }),

        actions: {
            /**
             * Get a clone of the project.
             *
             * @returns {*}
             */
            clone() {
                const clone = cloneDeep(this.$state);

                clone.tab.id = uuid();

                return clone;
            },

            /**
             * Export the project into a JSON config file.
             */
            export() {
                const state = this.clone();

                const name = state.tab.name || 'Untitled Project';

                void saveTextFile(JSON.stringify(state, null, 2), `${name}.json`);
            },

            /**
             * Save the project as a template.
             */
            saveAsTemplate() {
                const templates = useTemplateStore();

                const project = this.clone();

                project.tab.created_at = new Date();

                project.tab.name = project.tab.name || 'Untitled Project';

                templates.add(project);
            },
        },

        persist: {
            key: id,
            storage: import.meta.client ? localStorage : undefined,
        },
    });
}
