import Ember from 'ember';

let reg = /^%\[([^\]]*)\]\s*\(([^)]+)\)/;

export default Ember.Controller.extend({
  mdPlugins: [
    {
      name: 'video',
      type: 'inline',
      parse: (state, silent) => {
        // it is surely not our rule, so we could stop early
        if (state.src[state.pos] !== '%') {
          return false;
        }

        var match = reg.exec(state.src.slice(state.pos));
        if (!match) {
          return false;
        }

        // in silent mode it shouldn't output any tokens or modify pending
        if (!silent) {
          state.push({
            type: 'video',
            title: match[1],
            src: match[2].replace('/watch?v=', '/embed/'),
            level: state.level,
          });
        }

        // every rule should set state.pos to a position after token's contents
        state.pos += match[0].length;

        return true;
      },
      render: (tokens, idx/*, options, env*/) => {
        return `<iframe width="560" height="315" src="${tokens[idx].src}" frameborder="0"></iframe>`;
      },
      options: {}
    }
  ]
});
