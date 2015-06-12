var Dashboard = Vue.extend({

    data: function() {
        return window.$data;
    },

    created: function() {

        this.Widgets = this.$resource('admin/dashboard/:id');

        var self = this;
        this.$set('widgets', this.widgets.filter(function(widget) {

            if (self.getType(widget.type)) {

                widget.idx   = widget.idx || 100;
                widget.column = widget.column || 0;

                return true;
            }

            return false;
        }));

        this.$set('editing', {});


        // widget re-ordering
        $('#dashboard').find('.uk-sortable[data-column]').each(function(){

            UIkit.sortable(this,{group:'widgets'});

        }).on('change.uk.sortable', function(e, sortable, item, mode) {

            if (!mode) return;

            item     = $(item)
            sortable = sortable.element ? sortable : sortable.data('sortable');

            switch(mode) {
                case 'added':
                case 'moved':

                    var widgets = [];

                    sortable.element.children().each(function(idx){

                    });
            }
        });
    },

    filters: {

        column: function (widgets, column) {

            column = parseInt(column || 0, 10);

            return _.sortBy(widgets.filter(function (widget) {
                return widget.column == column;
            }), 'idx');
        }
    },

    computed: {

        columns: function() {
            var i = 0;
            return _.groupBy(this.widgets, function() {
                return i++ % 3;
            });
        }

    },

    methods: {

        add: function(type) {

            var column = 0, sortables = $('#dashboard').find('.uk-sortable[data-column]');

            sortables.each(function(idx) {
                column = (this.children.length < sortables.eq(column)[0].children.length) ? idx : column;
            });

            this.Widgets.save({ widget: _.merge({ type: type.id, column:column, idx: sortables.eq(column)[0].children.length }, type.defaults)}, function(data) {
                this.widgets.push(data);
                this.editing.$set(data.id, true);
            });

        },

        getType: function(id) {
            return _.find(this.getTypes(), { id: id });

        },

        getTypes: function() {

            return _(this.$options.components)
                .filter(function(component) { return _.has(component, 'options.type') })
                .map(function(component) { return _.merge( component.options.type, { component: component.options.name } ) })
                .value();
        }

    },

    components: {

        'widget-panel': require('../components/widget-panel'),
        feed: require('../components/widget-feed.vue'),
        location: require('../components/widget-location.vue')

    }

});

$(function () {

    new Dashboard().$mount('#dashboard');

});

module.exports = Dashboard;