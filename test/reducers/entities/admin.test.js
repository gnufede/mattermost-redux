// Copyright (c) 2018-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import assert from 'assert';

import {AdminTypes, UserTypes} from 'action_types';
import reducer from 'reducers/entities/admin';

describe('reducers.entities.admin', () => {
    describe('pluginStatuses', () => {
        it('initial state', async () => {
            const state = {};
            const action = {};
            const expectedState = {};

            const actualState = reducer({pluginStatuses: state}, action);
            assert.deepEqual(actualState.pluginStatuses, expectedState);
        });

        it('RECEIVED_PLUGIN_STATUSES, empty initial state', async () => {
            const state = {};
            const action = {
                type: AdminTypes.RECEIVED_PLUGIN_STATUSES,
                data: [
                    {
                        plugin_id: 'plugin_0',
                        cluster_discovery_id: 'cluster_discovery_id_1',
                        version: '0.1.0',
                        state: 0,
                        name: 'Plugin 0',
                        description: 'The plugin 0.',
                        is_prepackaged: false,
                    },
                    {
                        plugin_id: 'plugin_1',
                        cluster_discovery_id: 'cluster_discovery_id_1',
                        version: '0.0.1',
                        state: 0,
                        name: 'Plugin 1',
                        description: 'The plugin.',
                        is_prepackaged: false,
                    },
                    {
                        plugin_id: 'plugin_1',
                        cluster_discovery_id: 'cluster_discovery_id_2',
                        version: '0.0.2',
                        state: 1,
                        name: 'Plugin 1',
                        description: 'The plugin, different description.',
                        is_prepackaged: false,
                    },
                ],
            };
            const expectedState = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 0,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 1,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: true,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                        {
                            cluster_discovery_id: 'cluster_discovery_id_2',
                            state: 1,
                            version: '0.0.2',
                        },
                    ],
                },
            };

            const actualState = reducer({pluginStatuses: state}, action);
            assert.deepEqual(actualState.pluginStatuses, expectedState);
        });

        it('RECEIVED_PLUGIN_STATUSES, previously populated state', async () => {
            const state = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0-old',
                    state: 0,
                    name: 'Plugin 0 - old',
                    description: 'The plugin 0 - old.',
                    is_prepackaged: true,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 0,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                    ],
                },
            };
            const action = {
                type: AdminTypes.RECEIVED_PLUGIN_STATUSES,
                data: [
                    {
                        plugin_id: 'plugin_0',
                        cluster_discovery_id: 'cluster_discovery_id_1',
                        version: '0.1.0',
                        state: 0,
                        name: 'Plugin 0',
                        description: 'The plugin 0.',
                        is_prepackaged: false,
                    },
                    {
                        plugin_id: 'plugin_1',
                        cluster_discovery_id: 'cluster_discovery_id_1',
                        version: '0.0.1',
                        state: 0,
                        name: 'Plugin 1',
                        description: 'The plugin.',
                        is_prepackaged: false,
                    },
                    {
                        plugin_id: 'plugin_1',
                        cluster_discovery_id: 'cluster_discovery_id_2',
                        version: '0.0.2',
                        state: 1,
                        name: 'Plugin 1',
                        description: 'The plugin, different description.',
                        is_prepackaged: false,
                    },
                ],
            };
            const expectedState = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 0,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 1,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: true,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                        {
                            cluster_discovery_id: 'cluster_discovery_id_2',
                            state: 1,
                            version: '0.0.2',
                        },
                    ],
                },
            };

            const actualState = reducer({pluginStatuses: state}, action);
            assert.deepEqual(actualState.pluginStatuses, expectedState);
        });

        it('RECEIVED_PLUGIN, new plugin', async () => {
            const state = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 0,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: true,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 0,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                    ],
                },
            };
            const action = {
                type: AdminTypes.RECEIVED_PLUGIN,
                data: {
                    id: 'plugin_new',
                    version: '0.5.0',
                    name: 'New Plugin',
                    description: 'The new plugin.',
                    active: false,
                },
            };
            const expectedState = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 0,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: true,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 0,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                    ],
                },
                plugin_new: {
                    id: 'plugin_new',
                    version: '0.5.0',
                    state: 0,
                    name: 'New Plugin',
                    description: 'The new plugin.',
                    is_prepackaged: false,
                    active: false,
                    instances: [],
                },
            };

            const actualState = reducer({pluginStatuses: state}, action);
            assert.deepEqual(actualState.pluginStatuses, expectedState);
        });

        it('RECEIVED_PLUGIN, existing plugin', async () => {
            const state = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 0,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: true,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 0,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                    ],
                },
            };
            const action = {
                type: AdminTypes.RECEIVED_PLUGIN,
                data: {
                    id: 'plugin_1',
                    version: '0.5.0',
                    name: 'Existing Plugin',
                    description: 'The existing plugin.',
                    active: false,
                },
            };
            const expectedState = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 0,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: true,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.5.0',
                    state: 0,
                    name: 'Existing Plugin',
                    description: 'The existing plugin.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                    ],
                },
            };

            const actualState = reducer({pluginStatuses: state}, action);
            assert.deepEqual(actualState.pluginStatuses, expectedState);
        });

        it('ACTIVATED_PLUGIN, plugin_0', async () => {
            const state = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 0,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 1,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: true,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                        {
                            cluster_discovery_id: 'cluster_discovery_id_2',
                            state: 1,
                            version: '0.0.2',
                        },
                    ],
                },
            };
            const action = {
                type: AdminTypes.ACTIVATED_PLUGIN,
                data: 'plugin_0',
            };
            const expectedState = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 1,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: false,
                    active: true,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 1,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: true,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                        {
                            cluster_discovery_id: 'cluster_discovery_id_2',
                            state: 1,
                            version: '0.0.2',
                        },
                    ],
                },
            };

            const actualState = reducer({pluginStatuses: state}, action);
            assert.deepEqual(actualState.pluginStatuses, expectedState);
        });

        it('ACTIVATE_PLUGIN_FAILURE, plugin_0', async () => {
            const state = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 0,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 1,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: true,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                        {
                            cluster_discovery_id: 'cluster_discovery_id_2',
                            state: 1,
                            version: '0.0.2',
                        },
                    ],
                },
            };
            const action = {
                type: AdminTypes.ACTIVATE_PLUGIN_FAILURE,
                data: 'plugin_0',
            };
            const expectedState = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 3,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 1,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: true,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                        {
                            cluster_discovery_id: 'cluster_discovery_id_2',
                            state: 1,
                            version: '0.0.2',
                        },
                    ],
                },
            };

            const actualState = reducer({pluginStatuses: state}, action);
            assert.deepEqual(actualState.pluginStatuses, expectedState);
        });

        it('DEACTIVATED_PLUGIN, plugin_0', async () => {
            const state = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 0,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 1,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: true,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                        {
                            cluster_discovery_id: 'cluster_discovery_id_2',
                            state: 1,
                            version: '0.0.2',
                        },
                    ],
                },
            };
            const action = {
                type: AdminTypes.DEACTIVATED_PLUGIN,
                data: 'plugin_0',
            };
            const expectedState = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 0,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 1,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: true,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                        {
                            cluster_discovery_id: 'cluster_discovery_id_2',
                            state: 1,
                            version: '0.0.2',
                        },
                    ],
                },
            };

            const actualState = reducer({pluginStatuses: state}, action);
            assert.deepEqual(actualState.pluginStatuses, expectedState);
        });

        it('DEACTIVATED_PLUGIN, plugin_1', async () => {
            const state = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 0,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 1,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: true,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                        {
                            cluster_discovery_id: 'cluster_discovery_id_2',
                            state: 1,
                            version: '0.0.2',
                        },
                    ],
                },
            };
            const action = {
                type: AdminTypes.DEACTIVATED_PLUGIN,
                data: 'plugin_1',
            };
            const expectedState = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0',
                    state: 0,
                    name: 'Plugin 0',
                    description: 'The plugin 0.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 0,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                        {
                            cluster_discovery_id: 'cluster_discovery_id_2',
                            state: 1,
                            version: '0.0.2',
                        },
                    ],
                },
            };

            const actualState = reducer({pluginStatuses: state}, action);
            assert.deepEqual(actualState.pluginStatuses, expectedState);
        });

        it('LOGOUT_SUCCESS, previously populated state', async () => {
            const state = {
                plugin_0: {
                    id: 'plugin_0',
                    version: '0.1.0-old',
                    state: 0,
                    name: 'Plugin 0 - old',
                    description: 'The plugin 0 - old.',
                    is_prepackaged: true,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.1.0',
                        },
                    ],
                },
                plugin_1: {
                    id: 'plugin_1',
                    version: '0.0.1',
                    state: 0,
                    name: 'Plugin 1',
                    description: 'The plugin.',
                    is_prepackaged: false,
                    active: false,
                    instances: [
                        {
                            cluster_discovery_id: 'cluster_discovery_id_1',
                            state: 0,
                            version: '0.0.1',
                        },
                    ],
                },
            };
            const action = {
                type: UserTypes.LOGOUT_SUCCESS,
            };
            const expectedState = {};

            const actualState = reducer({pluginStatuses: state}, action);
            assert.deepEqual(actualState.pluginStatuses, expectedState);
        });
    });
});
