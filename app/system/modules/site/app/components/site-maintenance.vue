<template>

    <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
        <div data-uk-margin>
            <h2 class="uk-margin-remove">{{ 'Maintenance' | trans }}</h2>
        </div>
        <div data-uk-margin>
            <button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>
        </div>
    </div>

    <div class="uk-form uk-form-horizontal">

        <div class="uk-form-row">
            <label for="form-offlinemessage" class="uk-form-label">{{ 'Offline Message' | trans }}</label>
            <div class="uk-form-controls">
                <textarea id="form-offlinemessage" class="uk-form-width-large" placeholder="{{ &quot;We'll be back soon.&quot; | trans }}" rows="5" v-model="config.maintenance.msg"></textarea>
                <p class="uk-form-controls-condensed">
                    <label><input type="checkbox" value="1" v-model="config.maintenance.enabled"> {{ 'Put the site offline and show the offline message.' | trans }}</label>
                </p>
            </div>
        </div>

    </div>

</template>

<script>

    module.exports = {

        section: {
            label: 'Maintenance',
            icon: 'uk-icon-wrench',
            priority: 20
        },

        props: ['config']

    }

</script>
